"use client";
import {
	Form,
	FormGroup,
	Button,
	Col,
	Row,
} from "react-bootstrap";
import { auth, provider } from "../_components/firebaseConfig";
import { getFirestore, collection, addDoc , doc, setDoc} from 'firebase/firestore';
import { db } from "../_components/firebaseConfig";
import Styles from "../_styles/SigninPage/SignupComponent.module.scss";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";

// validator libs
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters long")
		.required("Password is required"),
	firstname: yup.string().required("First name is required"),
	lastname: yup.string().required("Last name is required"),
	joiningas: yup.string().required("Who do you want to join as"),
	confirmpassword: yup.string().required("Please confirm your password"),
}); // end of schema

// start of main function:
const SignupComponent: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const router = useRouter();

	// Submission function:
	const onSubmit = async (data: any) => {
		setIsLoading(true);

		createUserWithEmailAndPassword(auth, data.email, data.password)
		.then( async (userCredential: any) => {
			// Signed up 

			try {
				// After successful signup, extract user information from the auth object (excluding password)
				const user = userCredential.user;
				const userData = {
					uid: user.uid,
					email: user.email,
					firstname: data.firstname,
					lastname: data.lastname,
					type: data.joiningas
				};

				const userRef = doc(db, 'users', userData.uid); // Use doc() for a single document
				await setDoc(userRef, userData);
				router.push('/feed');

			} catch (error: unknown) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}

		}).catch((error: any) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	};

	return (
		<div className={`${Styles.mainContainer}`}>
			<Row className="">
				<h3>Register as a Writer/Reader</h3>
			</Row>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Row>
					<Col lg="6" md="6" sm="12">
						<FormGroup className="mb-3">
							<Form.Label htmlFor="firstName">
								First name
							</Form.Label>
							<input
								{...register("firstname")}
								className={`form-control`}
								type="text"
								id="firstName"
							/>
							{errors.firstname && (
								<span style={{ color: "red" }}>
									{errors.firstname.message}
								</span>
							)}
						</FormGroup>
					</Col>

					<Col lg="6" md="6" sm="12">
						<FormGroup className="mb-3">
							<Form.Label htmlFor="lastName">
								Last name
							</Form.Label>
							<input
								{...register("lastname")}
								className={`form-control`}
								type="text"
								id="lastName"
							/>
							{errors.lastname && (
								<span style={{ color: "red" }}>
									{errors.lastname.message}
								</span>
							)}
						</FormGroup>
					</Col>
				</Row>

				<Row>
					<FormGroup className="mb-3">
						<select
							{...register("joiningas")}
							className="form-select"
							aria-label="Default select example"
						>
							<option value="reader">Reader</option>
							<option value="writer">Writer</option>
						</select>
						{errors.joiningas && (
							<span style={{ color: "red" }}>
								{errors.joiningas.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<input
							{...register("email")}
							className={`form-control`}
							type="email"
							id="email"
						/>
						{errors.email && (
							<span style={{ color: "red" }}>
								{errors.email.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Form.Label htmlFor="password">Password</Form.Label>
						<input
							{...register("password")}
							className={`form-control`}
							type="password"
							id="password"
						/>
						{errors.password && (
							<span style={{ color: "red" }}>
								{errors.password.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Form.Label htmlFor="confirmPassword">
							Confirm password
						</Form.Label>
						<input
							{...register("confirmpassword")}
							className={`form-control`}
							type="password"
							id="confirmPassword"
						/>
						{errors.confirmpassword && (
							<span style={{ color: "red" }}>
								{errors.confirmpassword.message}
							</span>
						)}
					</FormGroup>

					<FormGroup className="mb-3">
						<Button
							type="submit"
							className={`${Styles.createButton}`}
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Create Account"}
						</Button>
					</FormGroup>
				</Row>
			</form>

			<Row className={`${Styles.SocialButtonsRow}`}>
				<Button className={`${Styles.GoogleButton}`}>
					<FcGoogle />
					&nbsp; Sign up with Google
				</Button>

				
			</Row>
		</div>
	);
};

export default SignupComponent;
