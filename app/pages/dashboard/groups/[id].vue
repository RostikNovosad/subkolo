<script setup lang="ts">
import { Plus, Trash, LogOut, ArrowLeft } from 'lucide-vue-next'
import { useGetCurrencies } from '~/composables/useGetCurrencies'
const route = useRoute()
const { group } = storeToRefs(useGroupStore())
const {
    getGroup,
    updateGroup,
    deleteGroup,
    addMember,
    createInviteLink,
    deleteMember,
    deleteInvite,
} = useGroupStore()
const { t } = useI18n()
const toast = useToast()
const id = route.params.id as string
const user = useSupabaseUser()

const showDeleteMemberModal = ref(false)
const showDeleteGroupModal = ref(false)
const showDeleteInviteModal = ref(false)
const showLeaveModal = ref(false)
const showInviteModal = ref(false)
const selectedMemberIdToDelete = ref()
const selectedInviteLinkToDelete = ref()
const currencies = useGetCurrencies()

const deleteCurrentGroup = async () => {
    try {
        await deleteGroup(id)
        showDeleteGroupModal.value = false
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasDeleted'),
            life: 3000,
        })
        navigateTo(`/dashboard/groups`)
    } catch (error) {}
}

const inviteMember = async (data: AddMemberPayload) => {
    try {
        if (data.is_invite) {
            await createInviteLink({
                group_id: id,
                display_name: data.display_name,
                price_to_set: data.assigned_cost,
            })
        } else {
            await addMember({
                group_id: id,
                display_name: data.display_name,
                assigned_cost: data.assigned_cost,
            })
        }
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasCreated'),
            life: 3000,
        })
        await getGroup(id)
        showInviteModal.value = false
    } catch (error) {
        console.error(error)
    }
}

const handleRemoveMember = (id: string) => {
    showDeleteMemberModal.value = true
    selectedMemberIdToDelete.value = id
}
const handleRemoveInvite = (token: string) => {
    showDeleteInviteModal.value = true
    selectedInviteLinkToDelete.value = token
}
const deleteCurrentMember = async () => {
    try {
        await deleteMember(selectedMemberIdToDelete.value)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasDeleted'),
            life: 3000,
        })
        await getGroup(id)
        showDeleteMemberModal.value = false
    } catch (e) {}
}

const deleteCurrentInvite = async () => {
    try {
        await deleteInvite(selectedInviteLinkToDelete.value)
        toast.add({
            severity: 'success',
            summary: t('notifications.success.success'),
            detail: t('notifications.success.wasDeleted'),
            life: 3000,
        })
        await getGroup(id)
        showDeleteInviteModal.value = false
    } catch (e) {}
}

await getGroup(id)

const isOwner = computed(() => group.value.owner_id === user.value?.sub)

const currency = computed(
    () =>
        currencies.find((el) => el.id === group.value.subscription.currency)
            ?.name
)

// Для визначення, чи можна додати ще когось
const canAddMore = computed(
    () =>
        group.value.group_members.length + group.value.pending_invites.length <
        group.value.max_members
)

const hasFreeSlots = computed(() => {
    return (
        group.value.group_members?.length +
            group.value.pending_invites?.length <
        group.value.max_members
    )
})

const totalCovered = computed(() => {
    const membersSum = group.value.group_members?.reduce(
        (acc, m) => acc + m.assigned_cost,
        0
    )
    const invitesSum = group.value.pending_invites?.reduce(
        (acc, i) => acc + i.price_to_set,
        0
    )
    if (membersSum && invitesSum) return membersSum + invitesSum
    return 0
})

const allMembers = computed(() => {
    if (group.value) {
        return [...group.value?.group_members, ...group.value?.pending_invites]
    }
    return []
})
const remainingSlots = computed(() => {
    const max = group.value?.max_members || 0
    const occupied = allMembers.value.length
    return Math.max(0, max - occupied)
})

const occupiedSlots = computed(() => {
    const membersCount = group.value?.group_members?.length || 0
    const invitesCount = group.value?.pending_invites?.length || 0
    return membersCount + invitesCount
})

const copyLink = (token: string) => {
    navigator.clipboard.writeText(token)
    toast.add({
        severity: 'success',
        summary: t('notifications.success.success'),
        detail: t('notifications.success.wasCopied'),
        life: 3000,
    })
}

definePageMeta({
    layout: 'dashboard',
    middleware: 'auth',
})
</script>
<template>
    <Dialog
        :open="showDeleteGroupModal"
        @update:open="showDeleteGroupModal = $event"
    >
        <FormsConfirmModal
            v-model:open="showDeleteGroupModal"
            @delete="deleteCurrentGroup"
            @close="showDeleteGroupModal = false"
        />
    </Dialog>
    <Dialog
        :open="showDeleteMemberModal"
        @update:open="showDeleteMemberModal = $event"
    >
        <FormsConfirmModal
            v-model:open="showDeleteMemberModal"
            @delete="deleteCurrentMember"
            @close="showDeleteMemberModal = false"
        />
    </Dialog>
    <Dialog
        :open="showDeleteInviteModal"
        @update:open="showDeleteInviteModal = $event"
    >
        <FormsConfirmModal
            v-model:open="showDeleteInviteModal"
            @delete="deleteCurrentInvite"
            @close="showDeleteInviteModal = false"
        />
    </Dialog>
    <Dialog :open="showInviteModal" @update:open="showInviteModal = $event">
        <FormsInviteMember
            v-model:open="showInviteModal"
            @create="inviteMember"
            @close="showInviteModal = false"
        />
    </Dialog>
    <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Button
                    variant="ghost"
                    size="icon"
                    @click="navigateTo('/dashboard/groups')"
                >
                    <ArrowLeft />
                </Button>
            </div>

            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold tracking-tight">
                    {{ group?.subscription?.name }}
                </h1>
                <div class="flex gap-2">
                    <Button
                        v-if="isOwner"
                        variant="destructive"
                        @click="showDeleteGroupModal = true"
                    >
                        <Trash class="h-4 w-4" />
                        {{ t('actions.deleteGroup') }}
                    </Button>
                    <Button
                        v-else
                        variant="outline"
                        @click="showLeaveModal = true"
                    >
                        <LogOut class="mr-2 h-4 w-4" />
                        {{ t('actions.leaveGroup') }}
                    </Button>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card class="p-4 flex flex-col gap-1">
                <span class="text-sm text-muted-foreground">
                    {{ t('group.totalCost') }}
                </span>
                <span class="text-2xl font-bold">
                    {{ group?.subscription?.price }}
                    {{ currency }}
                </span>
            </Card>
            <Card class="p-4 flex flex-col gap-1">
                <span class="text-sm text-muted-foreground">
                    {{ t('group.slots') }}
                </span>
                <span class="text-2xl font-bold">
                    {{ occupiedSlots }} /
                    {{ group?.max_members }}
                </span>
            </Card>
            <Card class="p-4 flex flex-col gap-1">
                <span class="text-sm text-muted-foreground">
                    {{ t('group.coveredAmount') }}
                </span>
                <span class="text-2xl font-bold text-green-600">
                    {{ totalCovered }}
                    {{ currency }}
                </span>
            </Card>
        </div>

        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold">
                    {{ t('group.membersList') }}
                </h3>
                <Button
                    v-if="isOwner && hasFreeSlots"
                    @click="showInviteModal = true"
                    size="sm"
                >
                    <Plus class="h-4 w-4" /> {{ t('actions.addMember') }}
                </Button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardSMemberCard
                    v-for="member in allMembers"
                    :key="member.id"
                    :member="member"
                    :is-owner-of-group="isOwner"
                    :currency="currency"
                    @remove="handleRemoveMember"
                    @copy-invite="copyLink"
                    @remove-invite="handleRemoveInvite"
                />

                <div
                    v-for="i in remainingSlots"
                    :key="i"
                    class="border-2 border-dashed rounded-xl flex items-center justify-center p-8 text-muted-foreground opacity-50"
                >
                    {{ t('group.emptySlot') }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
