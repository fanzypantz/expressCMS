export default function({ store, error }) {
  console.log('store: ', store.state.user);
  if (store.state.user === null) {
    error({
      message: 'You are not connected',
      statusCode: 403
    });
  } else if (!store.state.user.admin) {
    error({
      message: 'You are not an admin',
      statusCode: 403
    });
  }
}
