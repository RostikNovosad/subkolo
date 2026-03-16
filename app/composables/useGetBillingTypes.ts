export const useGetBillingTypes = () => {
    const { $i18n } = useNuxtApp()

    return computed(() => [
        {
            id: 1,
            name: $i18n.t('global.monthly'),
            period: $i18n.t('global.month'),
            color: '#64748B',
        },
        {
            id: 3,
            name: $i18n.t('global.quarterly'),
            period: $i18n.t('global.quarter'),
            color: '#3B82F6 ',
        },
        {
            id: 6,
            name: $i18n.t('global.halfYearly'),
            period: $i18n.t('global.halfYear'),
            color: '#8B5CF6',
        },
        {
            id: 12,
            name: $i18n.t('global.yearly'),
            period: $i18n.t('global.year'),
            color: '#10B981',
        },
    ])
}
