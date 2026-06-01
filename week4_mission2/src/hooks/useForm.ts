import { useState } from "react";

//입력값 타입
type Values = {
    email: string;
    password: string;
};

//에러 타입
type Errors = {
    email?: string;
    password?: string;
};

//입력 필드 클릭 여부
type Touched = {
    email?: boolean;
    password?: boolean;
};

//폼 상태 관리 커스텀 훅
export default function useForm() {
    const [values, setValues] = useState<Values>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Touched>({});

    //유효성 검사
    const validate = (name: string, value: string) => {
        let error = "";

        if (name === "email") { //이메일 형식 검사
            if (!value.includes("@") || !value.includes(".")) {
                error = "유효하지 않은 이메일 형식입니다.";
            }
        }

        if (name === "password") { //비밀번호 길이
            if (value.length < 6) {
                error = "비밀번호는 최소 6자 이상이어야 합니다.";
            }
        }

        //이 필드의 에러 상태 업데이트
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    //입력값 변경되면
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues((prev) => ({ ...prev, [name]: value }));
        validate(name, value); //입력할 때마다 유효성 검사
    };

    //입력창에서 벗어나면
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        //한 번이라도 건드리면(touched)
        setTouched((prev) => ({ ...prev, [name]: true }));
        validate(name, value);
    };

    //전체 폼 유효성 여부
    const isValid =
        values.email.length > 0 &&
        values.password.length > 0 &&
        !errors.email &&
        !errors.password;

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
    };
}