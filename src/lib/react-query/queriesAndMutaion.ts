import{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@transtack/react-query'
import { createUserAccount } from '../appwrite/api'
import { INewUser } from '@/types'

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: {email: string; password:string}) => signInAccount(user)
    })
}