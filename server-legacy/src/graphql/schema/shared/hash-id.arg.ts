import { arg, core } from 'nexus';

type HashIdArgConfig = Omit<core.NexusArgConfig<'HashId'>, 'type'>;

export const hashIdArg = (opts: HashIdArgConfig = {}) =>
  arg({ ...opts, type: 'HashId' });
