import { user } from '../data/user'

export const isUserExists = (userId: string): boolean => {
    return !!user.find(({id}) => userId === id);
}
