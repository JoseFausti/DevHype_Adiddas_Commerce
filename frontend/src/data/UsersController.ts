import { deleteUser, getUsers, login, postUser, putUser, register } from "../http/users";
import { IHttpResponse, IUser } from "../types/types";
import Cookies from "js-cookie";


export const getAllUsers = async (): Promise<IHttpResponse<IUser[]>> => {
    try {
        const users = await getUsers();
        if ('error' in users) {
            return {
                data: [],
                error: users.error,
                status: 404
            };
        }
        return {
            data: users,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: [],
            error: "Se produjo un error en getAllUsers: " + error,
            status: 500
        };
    }
}

export const getUserById = async (id: string): Promise<IHttpResponse<IUser | null>> => {
    try {
        const users = await getUsers();
        if ('error' in users) {
            return {
                data: null,
                error: users.error,
                status: 500
            };
        }
        const user = users.find(user => user.id === Number(id));
        if (!user) {
            return {
                data: null,
                error: "No se encontró el usuario",
                status: 404
            };
        }
        return {
            data: user,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en getUserById: " + error,
            status: 500
        };
    }
}

export const getUserByUsername = async (username: string): Promise<IHttpResponse<IUser | null>> => {
    try {
        const users = await getUserByUsername(username);
        if ('error' in users) {
            return {
                data: null,
                error: users.error,
                status: 500
            };
        }
        return {
            data: users,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en getUserByUsername: " + error,
            status: 500
        };
    }   
}

export const createUser = async (newUser: IUser): Promise<IHttpResponse<IUser | null>> => {
    try {
        const user = await postUser(newUser);
        if ('error' in user) {
            return {
                data: null,
                error: user.error,
                status: 500
            };
        }
        return {
            data: user,
            error: "",
            status: 201
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en createUser: " + error,
            status: 500
        };
    }
}

export const updateUser = async (id: string, updatedUser: IUser): Promise<IHttpResponse<IUser | null>> => {
    try {
        const user = await putUser(id, updatedUser);
        if ('error' in user) {
            return {
                data: null,
                error: user.error,
                status: 500
            };
        }
        return {
            data: user,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en updateUser: " + error,
            status: 500
        };
    }
}

export const deleteUserById = async (id: string): Promise<IHttpResponse<IUser | null>> => {
    try {
        const user = await deleteUser(id);
        if ('error' in user) {
            return {
                data: null,
                error: user.error,
                status: 500
            };
        }
        return {
            data: user,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en deleteUserById: " + error,
            status: 500
        };
    }
}

export const loginUser = async (username: string, password: string): Promise<IHttpResponse<{token: string} | null>> => {
    try {
        const data = await login(username, password);
        if ('error' in data) {
            return {
                data: null,
                error: data.error,
                status: 401
            };
        }

        Cookies.set('token', data.token, {
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        return {
            data: data,
            error: "",
            status: 200
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en loginUser: " + error,
            status: 500
        };
    }
}

export const registerUser = async (newUser: Omit<IUser, 'id' | 'deleted' | 'role' | 'address' | 'directions' | 'purchaseOrders'>): Promise<IHttpResponse<{token: string} | null>> => {
    try {
        const data = await register(newUser);
        if ('error' in data) {
            return {
                data: null,
                error: data.error,
                status: 500
            };
        }
        Cookies.set('token', data.token, {
            expires: 1, // 1 day
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        return {
            data: data,
            error: "",
            status: 201
        };
    } catch (error) {
        return {
            data: null,
            error: "Se produjo un error en registerUser: " + error,
            status: 500
        };
    }
}