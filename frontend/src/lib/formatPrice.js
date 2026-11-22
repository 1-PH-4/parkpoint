const formatter = new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency: 'EUR'
});

export function formatPrice(price){
    return formatter.format(price);
}

