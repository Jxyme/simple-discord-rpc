const Joi = require('joi')

module.exports = Joi.object({
  applicationId: Joi.string().regex(/^\d+$/).label('Application ID').required(),
  activity: Joi.object({
    details: Joi.string().min(2).max(128).label('Details'),
    state: Joi.string().min(2).max(128).label('State'),
    party: Joi.object({
      partySize: Joi.number().min(1).label('Party Size'),
      partyMax: Joi.number().min(Joi.ref('partySize')).label('Party Max'),
    }),
    timestamps: Joi.object({
      startTimestamp: Joi.date().label('Start Timestamp'),
      endTimestamp: Joi.date().min(Joi.ref('startTimestamp')).label('End Timestamp'),
    }),
    assets: Joi.object({
      largeImageKey: Joi.string().min(1).max(256).label('Large Image Key'),
      largeImageText: Joi.string().min(2).max(128).label('Large Image Text'),
      smallImageKey: Joi.string().min(1).max(256).label('Small Image Key'),
      smallImageText: Joi.string().min(2).max(128).label('Small Image Text'),
    }),
    buttons: Joi.object({
      primary: Joi.object({
        label: Joi.string().min(1).max(32).label('Primary Button Label'),
        url: Joi.string()
          .uri({ scheme: ['http', 'https'] })
          .max(512)
          .label('Primary Button Url'),
      }).custom((value, helper) => {
        if (!value.label && value.url) {
          return helper.message('"Primary Button Label" is required')
        }
        if (value.label && !value.url) {
          return helper.message('"Primary Button Url" is required')
        }
        return value
      }),
      secondary: Joi.object({
        label: Joi.string().min(1).max(32).label('Secondary Button Label'),
        url: Joi.string()
          .uri({ scheme: ['http', 'https'] })
          .max(512)
          .label('Secondary Button Url'),
      }).custom((value, helper) => {
        if (!value.label && value.url) {
          return helper.message('"Secondary Button Label" is required')
        }
        if (value.label && !value.url) {
          return helper.message('"Secondary Button Url" is required')
        }
        return value
      }),
    }),
    type: Joi.number().valid(0, 2, 3, 5).label('Type').required(),
  }),
  connection: Joi.object({
    maxRetries: Joi.number().min(0).label('Maximum Retries').required(),
    retryInterval: Joi.number().min(0).label('Retry Interval').required(),
  }),
})
