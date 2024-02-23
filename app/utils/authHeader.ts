import { useAppSelector } from '../../lib/redux/hooks';
import { selectAuth } from '../../lib/redux/slices/auth';

const AuthHeader = () => {
    const { accessToken } = useAppSelector(selectAuth);
    return {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    };
};

export default AuthHeader;
