import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await useAxiosSecure.get("/users");
            return res?.data;
        },
    });
    return [users, refetch];
}

export default useUser