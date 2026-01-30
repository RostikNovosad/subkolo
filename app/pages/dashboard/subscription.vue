<script setup lang="ts">
import { FolderCode } from 'lucide-vue-next'
import CreateSubscription from '~/components/forms/CreateSubscription.vue'
import type {
    CreateSubscriptionPayload,
    UpdateSubscriptionPayload,
} from '~/stores/subscriptions'
const { t } = useI18n()

import { useGetCurrencies } from '~/composables/useGetCurrencies'
import UpdateSubscription from '~/components/forms/UpdateSubscription.vue'
import ConfirmModal from '~/components/forms/ConfirmModal.vue'
const toast = useToast()

const {
    getSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
} = useSubscriptionStore()

const { subscriptions } = storeToRefs(useSubscriptionStore())

const params = ref({
    page: 0,
    pageSize: 10,
})

const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const currentDataToUpdate = ref({})
const currentIdToDelete = ref()

const currencies = useGetCurrencies()
const statuses = useGetStatuses()
const billingTypes = useGetBillingTypes()

const createNewSubscription = async (data: CreateSubscriptionPayload) => {
    try {
        await createSubscription(data)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasCreated'),
            life: 3000,
        })
        await getSubscriptions()
    } catch (e) {
        toast.add({
            severity: 'error',
            summary: t('notifications.errors.error'),
            detail: t('notifications.errors.errorOccurred'),
            life: 3000,
        })
    } finally {
        showCreateModal.value = false
    }
}

const updateCurrentSubscription = async (data: UpdateSubscriptionPayload) => {
    try {
        await updateSubscription(data)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasUpdated'),
            life: 3000,
        })
        await getSubscriptions()
    } catch (e) {
        toast.add({
            severity: 'error',
            summary: t('notifications.errors.error'),
            detail: t('notifications.errors.errorOccurred'),
            life: 3000,
        })
    } finally {
        showUpdateModal.value = false
    }
}

const deleteCurrentSubscription = async () => {
    try {
        await deleteSubscription(currentIdToDelete.value)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasDeleted'),
            life: 3000,
        })
        await getSubscriptions()
    } catch (e) {
        toast.add({
            severity: 'error',
            summary: t('notifications.errors.error'),
            detail: t('notifications.errors.errorOccurred'),
            life: 3000,
        })
    } finally {
        showDeleteModal.value = false
    }
}

await getSubscriptions()

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth',
})
</script>

<template>
    <Dialog :open="showCreateModal" @update:open="showCreateModal = $event">
        <CreateSubscription
            v-model:open="showCreateModal"
            @create="createNewSubscription"
            @close="showCreateModal = false"
        />
    </Dialog>

    <Dialog
        :open="showUpdateModal"
        @update:open="showUpdateModal = $event"
        :key="currentDataToUpdate"
    >
        <UpdateSubscription
            v-model:open="showUpdateModal"
            @update="updateCurrentSubscription"
            :current-data="currentDataToUpdate"
            @close="showUpdateModal = false"
        />
    </Dialog>

    <Dialog :open="showDeleteModal" @update:open="showDeleteModal = $event">
        <ConfirmModal
            v-model:open="showDeleteModal"
            @delete="deleteCurrentSubscription"
            @close="showDeleteModal = false"
        />
    </Dialog>

    <div v-if="!subscriptions.items.length" class="h-full flex items-center">
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderCode class="size-8" />
                </EmptyMedia>
                <EmptyTitle>{{ t('subscription.emptyTitle') }}</EmptyTitle>
                <EmptyDescription>
                    {{ t('subscription.emptySubtitle') }}
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button @click="showCreateModal = !showCreateModal">
                    {{ t('actions.createSubscription') }}
                </Button>
            </EmptyContent>
        </Empty>
    </div>
    <div v-else class="flex flex-col gap-4">
        <div class="flex items-center justify-between mt-4">
            <h2 class="text-xl font-bold">{{ t('pages.subscription') }}</h2>
            <Button @click="showCreateModal = !showCreateModal">
                {{ t('actions.createSubscription') }}
            </Button>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <DashboardSSubscriptionCard
                v-for="sub in subscriptions.items"
                :key="sub.id"
                :subscription="sub"
                @update="[
                    (showUpdateModal = true),
                    (currentDataToUpdate = sub),
                ]"
                @delete="[
                    (showDeleteModal = true),
                    (currentIdToDelete = sub.id),
                ]"
            />
        </div>
    </div>
</template>

<style scoped></style>
