const env = (var_name) => import.meta.env[var_name] ?? false;

export default env;
