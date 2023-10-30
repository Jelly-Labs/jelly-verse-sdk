import { BalancerSdkConfig, Network, PoolType } from '@/types';
import { Stable } from './pool-types/stable.module';
import { ComposableStable } from './pool-types/composableStable.module';
import { Weighted } from './pool-types/weighted.module';
import { MetaStable } from './pool-types/metaStable.module';
import { StablePhantom } from './pool-types/stablePhantom.module';
import { Linear } from './pool-types/linear.module';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';
import {
  isBalancerNetworkConfig,
  isLinearish,
  isNetworkEnum,
} from '@/lib/utils';
import { FX } from '@/modules/pools/pool-types/fx.module';
import { Gyro } from '@/modules/pools/pool-types/gyro.module';

/**
 * Wrapper around pool type specific methods.
 *
 * Returns a class instance of a type specific method handlers.
 */
export class PoolTypeConcerns {
  constructor(
    config: BalancerSdkConfig,
    public weighted: Weighted,
    public stable: Stable,
    public composableStable: ComposableStable,
    public metaStable: MetaStable,
    public stablePhantom = new StablePhantom(),
    public linear: Linear
  ) {
    if (isNetworkEnum(config.network)) {
      this.linear = new Linear(config.network as Network);
      this.composableStable = new ComposableStable(config.network as Network);
      this.stable = new Stable(config.network as Network);
      this.weighted = new Weighted(config.network as Network);
      this.metaStable = new MetaStable(config.network as Network);
    } else if (isBalancerNetworkConfig(config.network)) {
      this.linear = new Linear(config.network.chainId);
      this.composableStable = new ComposableStable(config.network.chainId);
      this.stable = new Stable(config.network.chainId);
      this.weighted = new Weighted(config.network.chainId);
      this.metaStable = new MetaStable(config.network.chainId);
    } else {
      console.log('Unknown network type');
    }
  }

  static from(
    poolType: PoolType,
    chainId: Network
  ):
    | Weighted
    | Stable
    | ComposableStable
    | MetaStable
    | StablePhantom
    | Linear {
    // Calculate spot price using pool type
    switch (poolType) {
      case 'ComposableStable': {
        return new ComposableStable(chainId);
      }
      case 'FX': {
        return new FX();
      }
      case 'GyroE':
      case 'Gyro2':
      case 'Gyro3': {
        return new Gyro();
      }
      case 'MetaStable': {
        return new MetaStable(chainId);
      }
      case 'Stable': {
        return new Stable(chainId);
      }
      case 'StablePhantom': {
        return new StablePhantom();
      }
      case 'Investment':
      case 'LiquidityBootstrapping':
      case 'Weighted': {
        return new Weighted(chainId);
      }
      default: {
        // Handles all Linear pool types
        if (isLinearish(poolType)) return new Linear(chainId);
        throw new BalancerError(BalancerErrorCode.UNSUPPORTED_POOL_TYPE);
      }
    }
  }
}
