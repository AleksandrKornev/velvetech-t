// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const currentDate = new Date(new Date().getTime() + 100000000);
    context.data.expires = currentDate;
    
    return context;
  };
};
