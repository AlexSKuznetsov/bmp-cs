import zeebe from 'zeebe-node';

// Start new process instance
async function startProcess(name, email, phone, summ, delivery, id) {
  const zbc = new zeebe.ZBClient('localhost:26500');
  const result = await zbc.createWorkflowInstance('Process_0i57hh4', {
    name,
    email,
    phone,
    summ,
    delivery,
    id,
    subscription: true,
  });
  return result;
}

export default startProcess;
