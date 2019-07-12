import React, { useState } from 'react';
import useTimeout from 'use-timeout';

const TimeoutMessage = () => {
  const [message, setMessage] = useState("This will timeout in 5 seconds");
  useTimeout(() => setMessage("Timeout!"), 5000);
  
  return <div data-testid="timeout-message">{message}</div>
}

export default TimeoutMessage;