/*************************************************************
*                      Ajax Request
*                 ---------------------------
*   Moontools Sistemas e Tecnologia
*   Autor: Deividi Anderson Scalzavara
*   Versão: 1.0
*   Data de Criação: 15/05/2014
*   Última Modificação: 15/05/2014
*  
**************************************************************/

/**
 * Esta é uma classe para efetuar resuisição Ajax
 * 
 * @param {string} url Url do destino da requisição Ajaz
 * @param {object} dados Dados a serem enviados junto com a requisição
 */
function AjaxRequest(url, dados){
    this.url = null;
    this.dados = null;
    this.dataType = 'json';
    this.timeout = 3000;
    this.cache = false;
    this.contentType = "application/json";
    this.async = true;
    
    /**
     * Construtor da Classe
     * @param {string} url Url do destino da requisição Ajaz
     * @param {object} dados Dados a serem enviados junto com a requisição
     * @returns {AjaxRequest}
     */
    this.AjaxRequest = function(url,dados){
        this.url = url;
        this.dados = dados;
        return this;
    };
    
    /**
     * 
     * @param {string} dataType Tipo de dado esperado com retorno na requisição
     * @returns {AjaxRequest}
     */
    this.setDataType = function(dataType){
        this.dataType = dataType;
        return this;
    };
    
    /**
     * 
     * @param {integer} timeout Tempo maximo que a requisição pode durar
     * @returns {AjaxRequest}
     */
    this.setTimeout = function(timeout){
        this.timeout = timeout;
        return this;
    };
    
    /**
     * 
     * @param {boolean} cache Define se o browser de ou não armazenar os dados de retorno em cache
     * @returns {AjaxRequest}
     */
    this.setCache = function(cache){
        this.cache = cache;
        return this;
    };
    
    /**
     * 
     * @param {string} contentType Indica o tipo de dado que será enviado na requisição
     * @returns {AjaxRequest}
     */
    this.setContentType = function(contentType){
        this.contentType = contentType;
        return this;
    };
    
    /**
     * 
     * @param {boolean} async Indica se a requisição vai ser Assíncrona ou Síncrona
     * @returns {AjaxRequest}
     */
    this.setAsync = function(async){
        this.async = async;
        return this;
    };
    
    /**
     * Executa a requisição
     * @param {function} successFunction Função a ser executada se a requisição for efetuada com sucesso
     * @param {function} errorFunction Função a ser executada se houver erro na requisição
     * @param {function} [timeoutFunction] Função a ser executada se houver timeout na requisição
     * 
     */
    this.request = function(successFunction,errorFunction,timeoutFunction){
               
        $.ajax({
           url : this.url+"?callback=?",
           data : this.dados,
           dataType : this.dataType,
           cache : this.cache,
           contentType : this.contentType,
           async : this.async,
           success : function(retorno){
               if(successFunction){
                   successFunction(retorno);
               }else{
                   console.log("Requisição efetuada com sucesso RETORNO:");
                   console.log(retorno);
               }
           },
           error : function(retorno){
               if(errorFunction){
                   errorFunction(retorno);
               }else{
                   console.log("Erro ao executar requisição ERRO:");
                   console.log(retorno);
               }
           },
           timeout : function(retorno){
               if(timeoutFunction){
                   timeoutFunction(retorno);
               }else{
                   console.log("Tempo esgotado ao executar requisição URL:"+this.url);
               }
           },
           statusCode:{
               404 : function(){
                   console.log("Erro 404");
               }
           }
           
        });
    };
    
    return AjaxRequest(url,dados);
};