#include <eosiolib/eosio.hpp>

using namespace eosio;

class motherdayv: public eosio::contract {
  public:
      using contract::contract;

      /// @abi action 
      void wish( account_name user ) {
         print( "Happy Mother's Day, ", name{user} );
      }
};

EOSIO_ABI( motherdayv, (wish) )
