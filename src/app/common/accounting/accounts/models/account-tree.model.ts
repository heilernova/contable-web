import { ITreeAccountNode } from "../accounts-data-source.service";
import { AccountsService } from "../accounts.service";
import { TypeAccount } from "../interfaces/types";

const TYPES: { [key: number]: string } = {
    1: "class",
    2: "group",
    4: "account",
    6: "subAccount",
    8: "auxiliary"
}

const parceType = (code: string): TypeAccount => {
    return (TYPES[code.length] ?? undefined) as "auxiliary";
}

export class TreeAccountsNode {
    private readonly _accounts: AccountsService;
    public readonly type: TypeAccount;
    public readonly id: string;
    public readonly code: string;
    public readonly name: string;
    public readonly children: TreeAccountsNode[];

    constructor(data: ITreeAccountNode, options: { accountsServicie: AccountsService }){
        this.type = parceType(data.code);
        this.id = data.id;
        this.code = data.code;
        this.name = data.name;
        this._accounts = options.accountsServicie;
        if (data.children && data.children.length > 0){
            this.children = data.children.map(x => new TreeAccountsNode(x, { accountsServicie: options.accountsServicie }));
        } else {
            this.children = [];
        }
    }

    public addChildren(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._accounts.register({ type: this.type, code: this.code }).then(res => {
                if (res){
                    
                    this.children.push(new TreeAccountsNode({
                        id: res.id,
                        code: res.code,
                        name: res.name,
                        children: []
                    }, { accountsServicie: this._accounts }));

                    this.children.sort((a, b) => a.code.localeCompare(b.code));
                    
                }
                resolve();
            })
        })
    }
}