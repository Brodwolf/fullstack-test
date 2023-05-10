export const DebuggerPolicy = () => {
  return Number(process.env.DEBBUGER_POLICY) || 0
}

export default DebuggerPolicy