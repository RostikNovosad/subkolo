<script setup lang="ts">
import { useGetCurrencies } from '~/composables/useGetCurrencies'

const { t } = useI18n()

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['delete', 'close'])
</script>

<template>
    <form>
        <DialogContent class="sm:max-w-[425px] max-h-[90dvh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {{ t('actions.delete') }}
                </DialogTitle>
                <DialogDescription>
                    {{ t('actions.deleteDescription') }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4"></div>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline"
                        >{{ t('actions.cancel') }}
                    </Button>
                </DialogClose>
                <Button type="button" @click="emit('delete')">
                    {{ t('actions.delete') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </form>
</template>
