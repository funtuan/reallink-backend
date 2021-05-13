import mongoose from 'mongoose'
import mongo from '../config/mongo'

mongoose.connect(mongo.url)
