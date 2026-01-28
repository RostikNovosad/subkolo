export const goToLogin = () => {
    const router = useRouter()

    document.body.classList.remove('modal-open')
    router.push('/dashboard')
}
