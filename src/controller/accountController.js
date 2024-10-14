import Account from "../model/account.js"

function getAccount(accountId) {
    let result = Account.ACCOUNTS.filter(el=> el.accountId == accountId)
    if (result.length>0){
        return result[0]
    }
    return 0
}

function depositIntoAccount(accountId, value) {
    let updated = null
    Account.ACCOUNTS = Account.ACCOUNTS.map(el =>{
        if (el.id == accountId){
            el.balance += value 
            updated = el
        }
    })
    return updated || 0
}

function withdrawFromAccount(accountId, value) {
    let updated = null
    Account.ACCOUNTS = Account.ACCOUNTS.map(el =>{
        if (el.id == accountId){
            el.balance -= value 
            updated = el
        }
    })
    return updated || 0
}

function transferintoAccounts(originId, destinationId, value) {
    let [origin, destination] = [null,null]
    let temp = Account.ACCOUNTS.map(el => {
        if (el.id==originId){
            el.balance -= value
            origin = el
        }else if (el.id==destinationId){
            el.balance += value
            destination = el
        }
        return el
    })

    if(!origin){
        return 0 
    }

    Account.ACCOUNTS = temp

    if(!destination){
        destination = {id:destinationId, balance: value}
        Account.ACCOUNTS.push(destination)
    }
    
    return { origin, destination }

}

export function getBalance(req,res) {
    let {accountId} = req.params

    let account = getAccount(accountId)

    if (account === 0){
        res.status(400).send(0)
        return
    }
    res.status(200).send(account.balance)
}

export function runEvent(req, res){
    let { body } = req
    let destinationId = req.body.destination || null
    let originId = req.body.origin || null
    let ammount = req.body.ammount
    let result = null
    switch(body.type){
        
        case "deposit":
            result = depositIntoAccount(destinationId,ammount)
            break
        case "withdraw":
            result = withdrawFromAccount(originId, ammount)
            break
        case "transfer":
            result = transferintoAccounts(originId, destinationId, ammount)
            break
        default:
            res.status(404).send("Operation not found")
            return
    }

    if (result){
        res.status(201).send(result)
        return
    }
    res.status(400).send(0)

}

export function resetAccounts(req,res){
    Account.resetAccounts()
    res.status(200).send("OK")
}