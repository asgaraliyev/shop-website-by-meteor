import SimpleSchema from 'simpl-schema';

const UserSchema = new SimpleSchema({
    username: {
        type: String,

    },
    emails: {
        optional: true,
        type: Array,
    },
    "emails.$": {
        type: Object,
    },
    "emails.$.address": {
        optional: true,
        type    : String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        optional: true,
        type: Boolean
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },

    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    password: {
        type: String,
        required: false,
        blackbox: true
    },


});
Meteor.users.attachSchema(UserSchema);