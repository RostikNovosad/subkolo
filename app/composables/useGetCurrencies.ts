export const useGetCurrencies = () => {
    const { $i18n } = useNuxtApp()

    return [
        {
            id: 0,
            name: $i18n.t('currency.usd'),
        },
        {
            id: 1,
            name: $i18n.t('currency.eur'),
        },
        {
            id: 2,
            name: $i18n.t('currency.uah'),
        },
    ]
}
