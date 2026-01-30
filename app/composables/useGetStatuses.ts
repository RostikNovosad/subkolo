export const useGetStatuses = () => {
    const { $i18n } = useNuxtApp()

    return computed(() => [
        {
            id: 0,
            name: $i18n.t('statuses.active'),
            color: '#10B981',
        },
        {
            id: 1,
            name: $i18n.t('statuses.unActive'),
            color: '#EF4444',
        },
    ])
}
