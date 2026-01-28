export const useGetBillingTypes = () => {
    const { $i18n } = useNuxtApp()

    return [
        {
            id: 1,
            name: $i18n.t('global.monthly'),
            color: '#64748B',
        },
        {
            id: 3,
            name: $i18n.t('global.quarterly'),
            color: '#3B82F6 ',
        },
        {
            id: 6,
            name: $i18n.t('global.halfYearly'),
            color: '#8B5CF6',
        },
        {
            id: 12,
            name: $i18n.t('global.yearly'),
            color: '#10B981',
        },
    ]
}
