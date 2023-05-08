import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createPost: async ({ request }) => {
		const { title, body, image, date } = Object.fromEntries(await request.formData()) as {
			title: string;
			body: string;
			image: string;
			date: string;
		};
		console.log({ title, body, image, date });
		try {
			await prisma.post.create({
				data: {
					image,
					title,
					body,
					date
				}
			});
		} catch (err) {
			fail(500, { message: 'Could not create post' });
		}
		return {
			status: 201
		};
	}
};
