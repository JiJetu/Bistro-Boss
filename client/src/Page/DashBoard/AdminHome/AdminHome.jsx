import UseAuth from "../../../hooks/UseAuth";

const AdminHome = () => {
    const {user} = UseAuth()
    return (
        <div>
            <h2 className="3xl">
                Hi, Welcome {user?.displayName ? user.displayName : 'Back'}
            </h2>
        </div>
    );
};

export default AdminHome;