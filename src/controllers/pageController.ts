import { Request, Response } from 'express';
import { Contact } from '../models/Contact';

export const ping = (req: Request, res: Response) => {
	res.send({ pong: true });
};

export const getAllContacts = async (req: Request, res: Response) => {
	try {
		let contacts = await Contact.findAll();
		if (contacts.length > 0) return res.status(200).send({ contacts });
		res.status(200).send({ message: 'There is no contacts!' });
	} catch (error) {
		res.status(404).send({ error });
	}
};

export const getContact = async (req: Request, res: Response) => {
	try {
		let contact = await Contact.findByPk(req.params.id);
		if (contact) return res.status(200).send({ contact });
		res.status(404).send({ error: 'User not found!' });
	} catch (error) {
		res.status(404).send({ error });
	}
};

export const postContact = async (req: Request, res: Response) => {
	try {
		const { name, email, phone } = req.body;
		if (!name || !email || !phone)
			return res.status(400).send({ error: 'Please, send all the data.' });
		const contact = Contact.build({
			name,
			email,
			phone,
		});
		console.log(contact);
		await contact.save();
		res.status(200).send({ contact });
	} catch (error) {
		res.status(404).send({ error });
	}
};

export const deleteContact = async (req: Request, res: Response) => {
	try {
		const contact = await Contact.findByPk(req.params.id);
		if (contact) {
			await contact.destroy();
			res.status(200).send({ message: 'Contact deleted.' });
		}
		res.status(404).send({ error: 'Contact not found!' });
	} catch (error) {
		res.status(404).send({ error });
	}
};

export const putContact = async (req: Request, res: Response) => {
	try {
		const contact = await Contact.findByPk(req.params.id);
		if (contact) {
			if (req.body.name) contact.name = req.body.name;
			if (req.body.email) contact.email = req.body.email;
			if (req.body.phone) contact.phone = req.body.phone;
			contact.save();
			return res.status(200).send({message: 'contact updated!', contact});
		}
		res.status(404).send({ error: 'Contact not found!' });
	} catch (error) {
		res.status(404).send({ error });
	}
};
