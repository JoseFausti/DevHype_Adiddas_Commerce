import { Navigate } from "react-router-dom";
import { getDecodedToken } from "../../../../utils/functions";
import { Role } from "../../../../utils/enums";

interface RequireAdminProps {
    children: React.ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {

    const decodedToken = getDecodedToken();
    if (!decodedToken || decodedToken.role !== Role.ADMIN) {
        return <Navigate to="/"/>;
    }

    return <>{children}</>;
};

export default RequireAdmin;