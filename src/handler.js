const notes = require('./notes'),
	{ nanoid } = require('nanoid'),
	addNoteHandler = (req, h) => {
		const id = nanoid(16),
			{ title, tags, body } = req.payload,
			updatedAt = createdAt = new Date().toISOString(),

			newNote = {
				id, title, tags, body, createdAt, updatedAt
			};

		notes.push(newNote);

		const isSuccess = notes.filter(note => note.id === id).length > 0;
		if (isSuccess) {
			return h.response({
				status: 'success',
				message: 'Catatan berhasil ditambah',
				data: {
					noteId: id
				}
			})
				.code(201);
		}

		return h.response({
			status: 'fail',
			message: 'Catatan gagal ditambahkan',
		})
			.code(500);
	},
	getAllNotesHandler = () => ({
		status: 'success',
		data: {
			notes,
		}
	}),
	getNoteByIdHandler = (req, h) => {
		const { id } = req.params,
			note = notes.filter(n => n.id === id)[0];

		if (note !== undefined) {
			return {
				status: 'success',
				data: {
					note
				}
			};
		}

		return h.response({
			status: 'fail',
			message: 'Catatan tidak ditemukan'
		})
			.code(404);
	},
	editNoteByIdHandler = (req, h) => {
		const { id } = req.params,
			{ title, tags, body } = req.payload,
			updatedAt = new Date().toISOString(),
			index = notes.findIndex(note => note.id === id);

		if (index !== -1) {
			notes[index] = {
				...notes[index],
				title,
				tags,
				body,
				updatedAt
			};

			return h.response({
				status: 'success',
				message: 'Catatan berhasil diperbarui'
			})
				.code(200);
		}

		return h.response({
			status: 'fail',
			message: 'Gagal memperbarui catatan. Id tidak ditemukan'
		})
			.code(404);
	},
	deleteNoteByIdHandler = (req, h) => {
		const { id } = req.params,
			index = notes.findIndex(note => note.id === id);

		if (index !== -1) {
			notes.splice(index, 1);

			return h.response({
				status: 'success',
				message: 'Catatan berhasil dihapus'
			})
				.code(200);
		}

		return h.response({
			status: 'fail',
			message: 'Catatan gagal dihapus. Id tidak ditemukan'
		})
			.code(404);
	};

module.exports = {
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	editNoteByIdHandler,
	deleteNoteByIdHandler
};