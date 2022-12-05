export const environment = {
  production: false,

  // SECRET Y PUBLIC KEY DE TIENDA 
  publicKeyPrd: 'pk_netpay_VFiLSdMlHMzPAAojgYHgcbAhm',
  secretKeyPrd: 'sk_netpay_xdXlYCWhoqAMSRPkHEsJgFnGyrhEEumVzKQvzbcTuLSbf',

  publicKey154: 'pk_netpay_sScJQohbaNyOpjRxZJEQUhEXY',
  secretKey154: 'sk_netpay_HWizvsxGYNJiuFZeXKpUiSEvpKgsUAULjxYxqSyWPSGVu',

  publicKeyLabs: 'pk_netpay_oMDpokjEpVQebbxReEsTfpRNg',
  secretKeyLabs: 'sk_netpay_znDKabpxYeRHHdvItwClVbsGXBLgBCyeaMiTzcsmYhNvl',

  // URL PARA AMBIENTE DE PRUEBAS
  url_labs: 'https://labs.netpaydev.com/gateway-ecommerce',
  url_154: 'https://gateway-154.netpaydev.com/gateway-ecommerce',
  url_191: 'https://gateway-191.netpaydev.com/gateway-ecommerce',
  url_prd: 'https://suite.netpay.com.mx/gateway-ecommerce',

  // URL DE SERVICIOS QUE SE UTILIZAN
  getTransaction: '/v3/transactions/',
  cardinalAuth: '/v3/cardinal-auth',
  charges: '/v3.5/charges'
};