function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const button = document.querySelector('.form__button')


const input = {
    productId: "pruduct_id",
    messageId: "message",
    paramsId: "params",
    secretKeyId: "secret-key",
    paymentId: "payment-id",
    requestPrevievId: "request-preview",
    priceId: "price",
    phoneId: "phone",
    сurrencyId: "currency"

}
const paymentId = document.getElementById(input.paymentId);
const requestPreviewArea = document.getElementById(input.requestPrevievId)
const productId = document.getElementById(input.productId);
const messageId = document.getElementById(input.messageId);
const paramsId = document.getElementById(input.paramsId);
const price = document.getElementById(input.priceId);
const phone = document.getElementById(input.phoneId);
const secretKey = document.getElementById(input.secretKeyId);
const currency = document.getElementById(input.сurrencyId);
const responseInput = document.getElementById('response-input');

button.addEventListener('click', (evt) => {
    evt.preventDefault();
    paymentId.value = getUuid();
    const sig = md5(secretKey.value + currency.value + paymentId.value + phone.value + price.value + productId.value);
    requestPreviewArea.value = `{
    "payment_id": "${paymentId.value}",
    "price": "${price.value}",
    "product": "${productId.value}",
    "phone": "${phone.value}",
    "currency": "${currency.value}",
    "sig": "${sig}"
}

    secret_key = '${secretKey.value}'
    stringToEncode: '${currency.value + paymentId.value + phone.value + price.value + productId.value}'`
    fetch('https://v2.pmc.vas-stream.ru/api/init', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                payment_id: paymentId.value,
                price: price.value,
                phone: phone.value,
                currency: currency.value,
                product: productId.value,
                sig: sig
            })

        })
//    .then(res => console.log(res.status))
    .then(res => res.json())
    .then(res => responseInput.value = JSON.stringify(res))


});
