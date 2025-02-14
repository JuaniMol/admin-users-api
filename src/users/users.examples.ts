// users.examples.ts
export const UserExamples = {
    CREATE_USER: {
        name: "Juan Pérez",
        email: "juan@example.com",
        age: 30,
        profile: {
            code: "EMP001",
            name: "Empleado",
            _id: "67af8130868574efdd0bbafa"
        },
        _id: "67af8130868574efdd0bbaf9",
        __v: 0
    },
    CONFLICT_ERROR: {
        message: "Email already exists",
        error: "Conflict",
        statusCode: 409
    },
    USER_LIST: [{
        _id: '507f1f77bcf86cd799439011',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        age: 30,
        profile: {
            code: 'EMP001',
            name: 'Empleado'
        }
    }],
    USER_DETAIL: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        age: 30,
        profile: {
            code: 'EMP001',
            name: 'Empleado'
        }
    },
    NOT_FOUND_ERROR: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found'
    },
    UPDATED_USER: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        age: 30,
        profile: {
            code: 'EMP001',
            name: 'Empleado',
            _id: '67af8130868574efdd0bbafa'
        },
        __v: 0
    }
};