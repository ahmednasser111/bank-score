"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	// useEffect(() => {
	// 	if (typeof window !== "undefined") {
	// 		const params = new URLSearchParams(window.location.search);
	// 		const error = params.get("error");
	// 		if (error) setErrorMsg(error);
	// 	}
	// }, []);

	async function login(formData: FormData) {
		// "use server";

		const userId = formData.get("userId") as string;

		if (!userId) {
			return redirect("/?error=Please enter a user ID");
		}

		// In a real app, we would validate the user ID against a database
		// For this demo, we'll accept any non-empty ID
		return redirect(`/dashboard/${userId}`);
	}

	return (
		<div className='flex min-h-screen flex-col'>
			<header className='bg-white text-slate-900 py-4 px-6 flex items-center justify-between border-b border-slate-200'>
				<div className='flex items-center gap-2'>
					<DollarSign className='h-6 w-6 text-blue-600' />
					<h1 className='text-xl font-bold'>BankScore</h1>
				</div>
			</header>

			<main className='flex-1 flex items-center justify-center p-6 bg-gray-50'>
				<Card className='w-full max-w-md bg-white text-slate-900 border border-slate-200 shadow-md transition-shadow hover:shadow-lg'>
					<CardHeader>
						<CardTitle className='text-2xl'>Welcome to BankScore</CardTitle>
						<CardDescription>
							Enter your user ID to access your banking information and credit
							score.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							action={login}
							className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='userId'>User ID</Label>
								<Input
									id='userId'
									name='userId'
									placeholder='Enter your user ID'
									required
									className='focus:border-blue-600 focus:ring-blue-600'
								/>
							</div>
							{errorMsg && (
								<p className='text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1'>
									{errorMsg}
								</p>
							)}
							<Button
								type='submit'
								className='w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors'>
								Login
							</Button>
						</form>
					</CardContent>
				</Card>
			</main>

			<footer className='bg-white text-slate-500 py-4 px-6 text-center border-t border-slate-200'>
				<p className='text-sm'>© 2025 BankScore. All rights reserved.</p>
			</footer>
		</div>
	);
}
