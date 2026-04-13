(function(window, undefined){

    scittle.core.eval_string("(.log js/console 'scittle1')");

    scittle.core.eval_string("(require '[emmy.env :as e :refer :all])");

    scittle.core.eval_string("(.log js/console (->infix ((D sin) 'x)))");

    var text = "Hello world6";

    window.Asc.plugin.init = function()
    {
        // call command with external variables
        Asc.scope.text = text; // export variable to plugin scope
        Asc.scope.emmy_eval = (s) => scittle.core.eval_string(s);
        console.log(77);
        console.log(Asc.scope.emmy_eval("(->infix ((D cos) 'x))"));
        this.callCommand(function() {
	          /**
	           * Function that returns the argument
	           * @customfunction
	           * @param {any} arg Any data.
             * @returns {any} The argumet of the function.
	           */
            function myf1(arg) {
	              return 4 * arg;
	          }

            var activeSheet = Api.GetActiveSheet();
            activeSheet.GetRange("A1").Select();
            activeSheet.GetRange("A1").SetValue(myf1(2));
            activeSheet.GetRange("B1").SetValue(Asc.scope.text);
            activeSheet.GetRange("C1").SetValue(Asc.scope.emmy_eval);
            console.log(Asc.scope.emmy_eval);

	          Api.AddCustomFunction(myf1);

        }, true);
    };

    window.Asc.plugin.button = function(id)
    {
    };

})(window, undefined);
