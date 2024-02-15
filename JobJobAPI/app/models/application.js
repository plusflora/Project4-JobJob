const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        cName: {
            type: String,
            required: true,
        },
        aDate: {
            type: Date,
        },
        aStatus: {
            type: Boolean,
            default: true,
        },
        interview: {
            type: Boolean,
            default: false,
        },
        interviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

applicationSchema.virtual('fullTitle').get(function() {
    return `${this.title} at ${this.cName}`;
});

module.exports = mongoose.model('Application', applicationSchema);