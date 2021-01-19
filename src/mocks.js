const mockClients = [
  {
    id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
    name: 'Britney',
    email: 'britneyblankenship@quotezart.com',
    role: 'admin',
    policies: [
      {
        id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
        amountInsured: '399.89',
        inceptionDate: '2015-07-06T06:55:49Z',
      },

      {
        id: '25202f31-fff0-481c-acfd-1f3ff2a9bcbe',
        amountInsured: '2579.16',
        inceptionDate: '2016-05-03T04:58:48Z',
      },
      {
        id: '15b4430d-96f8-468e-98c0-3caaf8b0b3b6',
        amountInsured: '645.65',
        inceptionDate: '2016-01-15T02:56:48Z',
      },
    ],
  },
  {
    id: 'f80b6ab6-ef21-4bd9-9d87-bec464e0f60f',
    name: 'Thelma',
    email: 'thelmablankenship@quotezart.com',
    role: 'user',
    policies: [
      {
        id: '6f514ec4-1726-4628-974d-20afe4da130c',
        amountInsured: '697.04',
        inceptionDate: '2014-09-12T12:10:23Z',
      },
    ],
  },
];

const mockPolicies = [
  {
    id: '15b4430d-96f8-468e-98c0-3caaf8b0b3b6',
    amountInsured: '645.65',
    email: 'inesblankenship@quotezart.com',
    inceptionDate: '2016-01-15T02:56:48Z',
    installmentPayment: true,
  },
  {
    id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
    amountInsured: '399.89',
    email: 'inesblankenship@quotezart.com',
    inceptionDate: '2015-07-06T06:55:49Z',
    installmentPayment: true,
  },
  {
    id: '6f514ec4-1726-4628-974d-20afe4da130c',
    email: 'inesblankenship@quotezart.com',
    amountInsured: '697.04',
    inceptionDate: '2014-09-12T12:10:23Z',
    installmentPayment: true,
  },
];

module.exports = { mockClients, mockPolicies };
