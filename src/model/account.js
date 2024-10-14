
export default class Account{
    static ACCOUNTS = []

    constructor(accountId){
        this.id = accountId
        this.balance = .0
    }

    deposit(value){
        this.balance += value
    }
    withdraw(value){
        this.balance -= value
    }

    static validAccount(accountId){
        return Account.ACCOUNTS.filter((el)=>el.id == accountId).length > 0
    }

    static resetAccounts(){
        Account.ACCOUNTS = []
    }

}
