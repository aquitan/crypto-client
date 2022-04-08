import { Schema } from 'mongoose'

export const INTERNAL_WALLET_SCHEMA = {
	coinName: {
		type: String,
		require: true
	},
	coinFullName: {
		type: String,
		require: true
	},
	walletAddress: {
		type: String,
		require: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'UserBaseData',
		require: true
	}
}