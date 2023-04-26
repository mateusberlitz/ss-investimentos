export default function moneyToBackend(money: string){
    //remove R$ unit
    if(money.indexOf("R$") >= 0){
        money = money.substring(2);
    }

    //parse string to double format
    money = money.replace(' ', '').replace('.', '').replace(',', '.');

    return money;
}