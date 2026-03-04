<script setup lang="ts">
import { FolderCode } from 'lucide-vue-next'
import { type CreateGroupPayload } from '~/stores/groups'
import CreateGroup from '~/components/forms/CreateGroup.vue'
const { t } = useI18n()
const toast = useToast()
const { groups } = storeToRefs(useGroupStore())
const { getGroups, createGroup } = useGroupStore()

const user = useSupabaseUser()

const showCreateModal = ref(false)

const createNewGroup = async (data: CreateGroupPayload) => {
    try {
        console.log(data)
        await createGroup(data)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasCreated'),
            life: 3000,
        })
        await getGroups()
    } catch (e) {
        console.error(e)
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

await getGroups()

definePageMeta({
    layout: 'dashboard',
})
</script>

<template>
    <Dialog :open="showCreateModal" @update:open="showCreateModal = $event">
        <FormsCreateGroup
            v-model:open="showCreateModal"
            @create="createNewGroup"
            @close="showCreateModal = false"
        />
    </Dialog>

    <div v-if="!groups.items.length" class="h-full flex items-center">
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderCode class="size-8" />
                </EmptyMedia>
                <EmptyTitle>{{ t('group.emptyTitle') }}</EmptyTitle>
                <EmptyDescription>
                    {{ t('group.emptySubtitle') }}
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button @click="showCreateModal = !showCreateModal">
                    {{ t('actions.createGroup') }}
                </Button>
            </EmptyContent>
        </Empty>
    </div>
    <div v-else class="flex flex-col gap-4">
        <div class="flex items-center justify-between mt-4">
            <h2 class="text-xl font-bold">{{ t('pages.group') }}</h2>
            <Button @click="showCreateModal = !showCreateModal">
                {{ t('actions.createGroup') }}
            </Button>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <!--            <pre>{{ groups }}</pre>-->
            <!--            <pre>{{ user }}</pre>-->
            <DashboardSGroupCard
                v-for="group in groups.items"
                :key="group.id"
                :group="group"
                :current-user-id="user.sub"
            />
        </div>
    </div>
</template>
