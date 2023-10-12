import { findUserById } from '../repositories/user.repository'

export const isUserExists = (userId: string): boolean => {
    return !!findUserById(userId);
}
