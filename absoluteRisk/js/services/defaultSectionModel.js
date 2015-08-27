/* Creates a Default section model */
app.factory('BuildDefaultModel', ['CacheService', '$http', '$rootScope', function(Cache, $http, $rootScope) {
    function DefaultModel(parent) {
        var self = this;

        self.genTemplate = true;
        self.isDisabled = true;
        self.section = parent;
        self.placeHolderRows = [0, 1, 2, 3, 4];
    }
    DefaultModel.prototype = {
        init: function(cfg) {
            var self = this;
            var endpoint = cfg.templateEndpoint;
            var referredSectionData;

            if (cfg.sectionReference) {
                referredSectionData = Cache.getUiData(cfg.sectionReference);
            }

            self.templateType = cfg.templateType;
            self.columns = cfg.cols ? cfg.cols : referredSectionData.columns;
            self.templateCols = self.columns;
            self.templateRows = [];

            if (self.templateType === 'staticDual') {
                /* Default to 2-column template vs. 3-column template */
                self.templateCols = self.columns[0];
                self.numOfCols = '2';
            }

            if (self.templateType === 'remote') {
                /* Remote data generation for template rows */
                self.getRemoteData(endpoint);
            }
        },
        selectTemplateColumns: function(val) {

            if (val === '2') {
                this.templateCols = this.columns[0];
            } else {
                this.templateCols = this.columns[1];
            }
        },
        exportToCsv: function(e) {
            var self = this;
            var filename = self.section.id;
        	var csvContent;

            e.preventDefault();
            e.stopPropagation();

            csvContent = 'data:text/csv;charset=utf-8,' + self.templateCols.join(',');

    		encodedUri = encodeURIComponent(csvContent);
    		window.open(encodedUri, '_self');
        },
        getRemoteData: function(url) {
            var remoteUrl = 'http://' + window.location.hostname + '/absoluteRiskRest/' + url;
            var remoteData = {
                pathToVariableListFile: Cache.getSectionKey('variable_list', 'path_to_file'),
                pathToGenFormulaFile: Cache.getSectionKey('generate_formula', 'path_to_file')
            };

            console.log('remote data is: ', remoteData);

            $http.post(remoteUrl, JSON.stringify(remoteData))
               .success(function(data, status, headers, config) {
                   console.log('returned row names are: ', data);
               })
               .error(function(data, status, headers, config) {
                   console.log('status is: ', status);
               })
               .finally(function(data) {
                   console.log('finally, data is: ', data);
               });
        },
        getJsonModel: function() {
            /* For 'default' sections, only need to create {} with section id and RData file path */
            Cache.setSectionData(this.section.id, {'path_to_file': ''} );

            /* Also store column and row template data for potential use by other sections */
            Cache.setUiData(this.section.id, {columns: this.templateCols, rows: this.templateRows });
        },
        parseJsonModel: function(model) {
            this.getJsonModel();

            if (model) {
                var m = JSON.parse(model);
                var filePath = m.path_to_file;

                Cache.setSectionKey(this.section.id, 'path_to_file', filePath);
            }
        }
    };

    return DefaultModel;
}]);
