describe("Cloud Object", function() {

	//Use Sample Table. 
	// -> Which has columns : 
	// name : string : required. 

    it("should save.", function(done) {

    	this.timeout('10000');

     	var obj = new CB.CloudObject('Sample');
     	obj.set('name', 'sample');
     	obj.save({
     		success : function(newObj){
     			if(obj.get('name') !== 'sample'){
     				throw 'name is not equal to what was saved.';
     			}
     			if(!obj.id){
     				throw 'id is not updated after save.';
     			}

     			done();
     		}, error : function(error){
                console.log(error);
     			throw 'Error saving the object';
     		}
     	});
    });

    it("should update the object after save and update.", function(done) {
        
        this.timeout('10000');

     	var obj = new CB.CloudObject('Sample');
     	obj.set('name', 'sample');
     	obj.save({
     		success : function(newObj){

     			var oldId = obj.id;

     			if(obj.get('name') !== 'sample'){
     				throw 'name is not equal to what was saved.';
     			}

     			if(!obj.id){
     				throw 'id is not updated after save.';
     			}

     			obj.set('name','sample1');
     			obj.save({
		     		success : function(newObj){

		     			if(obj.get('name') !== 'sample1'){
		     				throw 'name is not equal to what was saved.';
		     			}

		     			if(!obj.id){
		     				throw 'id is not updated after save.';
		     			}
		     			
		     			if(obj.id !== oldId){
		     				throw "did not update the object, but saved.";
		     			}

		     			done();
		     		}, error : function(error){
		     			throw 'Error updating the object';
		     		}
     			});

     		}, error : function(error){
     			throw 'Error saving the object';
     		}
     	});
    });

    it("should delete an object after save.", function(done) {

    	this.timeout('10000');
        
        var obj = new CB.CloudObject('Sample');
     	obj.set('name', 'sample');
     	obj.save({
     		success : function(newObj){
     			obj.delete({
		     		success : function(obj){
		     			done();
		     		}, error : function(error){
		     			throw 'Error deleting the object';
		     		}
     			});
     		}, error : function(error){
     			throw 'Error saving the object';
     		}
     	});
    });

    it("should not save an object which has required column which is missing. ", function(done) {
        this.timeout('10000');

     	var obj = new CB.CloudObject('Sample');
   		//name is required which is missing.
     	obj.save({
     		success : function(newObj){
     			throw "Saved an object even when required is missing.";
     		}, error : function(error){
     			done();
     		}
     	});
    });

    it("should not save an object with wrong datatype.", function(done) {
       this.timeout('10000');

     	var obj = new CB.CloudObject('Sample');
   		//name is string and we have a wrong datatype here.
   		obj.set('name', 10); //number instead of string.
     	obj.save({
     		success : function(newObj){
     			throw "Saved an object even when required is missing.";
     		}, error : function(error){
     			done();
     		}
     	});
    });

    it("should not save an object with dulplicate values in unique fields.", function(done) {

    	this.timeout('1000000');
        
        var text = util.makeString();

        var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');
        obj.set('unique', text);
   
     	obj.save({
     		success : function(newObj){
     			var obj = new CB.CloudObject('Sample');
		        obj.set('name','sample');
		        obj.set('unique', text); //saving with sample text
		     	obj.save({
		     		success : function(newObj){
		     			throw "Saved an object violated unique constraint.";
		     		}, error : function(error){
		     			done();
		     		}
		     	});

     		}, error : function(error){
     			throw "Saved Error";
     		}
     	});
    });

    it("should save an array.", function(done) {

    	this.timeout('10000');

        var text = util.makeString();

		var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');
        obj.set('stringArray', [text,text]); //saving with sample text
     	obj.save({
     		success : function(newObj){
     			done();
     		}, error : function(error){
     			throw "Error saving object. ";
     		}
     	});
    });

    it("should not save wrong datatype in an  array.", function(done) {
       	
       	this.timeout(10000);

		var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');
        obj.set('stringArray', [10,20]); //saving with sample text
     	obj.save({
     		success : function(newObj){
     			throw 'Wrong datatype in an array saved.';
     		}, error : function(error){
     			done();
     		}
     	});
    });

    it("should not allow multiple datatypes in an array. ", function(done) {
    	var text = util.makeString();

        var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');
        obj.set('stringArray', [text,20]); //saving with sample text
     	obj.save({
     		success : function(newObj){
     			throw 'Multiple datatype in an array saved.';
     		}, error : function(error){
     			done();
     		}
     	});
    });

    it("should save an array with JSON objects. ", function(done) {

    	this.timeout(10000);

        var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');
        obj.set('objectArray', [{sample : 'sample'},
        						{sample : 'sample'}
        					]); //saving with sample text
     	obj.save({
     		success : function(newObj){
     			done();
     		}, error : function(error){
     			throw "Error saving object. ";
     		}
     	});
    });

    it("should save a CloudObject as a relation. ", function(done) {
       	this.timeout(10000);

        var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');

        var obj1 = new CB.CloudObject('Sample');
        obj1.set('name','sample');

        obj.set('sameRelation', obj1); //saving with sample text

     	obj.save({
     		success : function(newObj){
     			done();
     		}, error : function(error){
     			throw "Error saving object. ";
     		}
     	});
    });

     it("should not save a a wrong relation.", function(done) {
       this.timeout(10000);

        var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');

        var obj1 = new CB.CloudObject('Student');
        obj1.set('name','sample');

        obj.set('sameRelation', obj1); //saving with sample text
        
     	obj.save({
     		success : function(newObj){
     			throw "Saved an object with a wrong relation."
     		}, error : function(error){
     			done();
     		}
     	});
    });

    it("should not save a CloudObject Relation when the schema of a related object is wrong. ", function(done) {
       this.timeout(10000);

        var obj = new CB.CloudObject('Sample');
        obj.set('name','sample');

        var obj1 = new CB.CloudObject('Sample');
        //name is required , which means the schema is wrong. 

        obj.set('sameRelation', obj1); //saving with sample text
        
     	obj.save({
     		success : function(newObj){
     			throw "Saved an object in a relation with an invalid schema.";
     		}, error : function(error){
     			done();
     		}
     	});
    });

    it("should not save a duplicate relation in unique fields. ", function(done) {

       this.timeout(10000);

       var obj = new CB.CloudObject('Sample');
       obj.set('name','sample');

        var obj1 = new CB.CloudObject('Sample');
        obj1.set('name','sample');

        obj.set('uniqueRelation', obj1); //saving with sample text
        
     	obj.save({
     		success : function(newObj){
     			var obj2 = new CB.CloudObject('Sample');
       			obj2.set('name','sample');
       			obj2.set('uniqueRelation', obj1);
       			obj2.save({success : function(newObj){
       				throw "Saved a duplicate relation on a unique field.";
       			}, error : function(error){
       				done();
       			}	
       		});


     		}, error : function(error){
     			throw "Cannot save an object";
     		}
     	});
    });

    it("should save an array of CloudObject.", function(done) {
       this.timeout(10000);

       var obj = new CB.CloudObject('Sample');
       obj.set('name','sample');

        var obj1 = new CB.CloudObject('Sample');
        obj1.set('name','sample');

        var obj2 = new CB.CloudObject('Sample');
		obj2.set('name','sample');
		obj2.set('relationArray', [obj1, obj]);

        
     	obj.save({
     		success : function(newObj){

       			obj2.save({success : function(newObj){
       				done();
       			}, error : function(error){
       				throw "Cannot save an object in a relation.";
       			}	
       		});
    	}});
    });

    it("should save an array of CloudObject with some objects saved and others unsaved.", function(done) {
       this.timeout(10000);

       var obj = new CB.CloudObject('Sample');
       obj.set('name','sample');

       obj.save({

     		success : function(newObj){

     			var obj1 = new CB.CloudObject('Sample');
		        obj1.set('name','sample');

		        var obj2 = new CB.CloudObject('Sample');
				obj2.set('name','sample');
				obj2.set('relationArray', [obj1, obj]);

       			obj2.save({success : function(newObj){
	       				done();
	       			}, error : function(error){
	       				throw "Cannot save an object in a relation.";
	       			}	
       			});
       			
    	}});

    });

    it("should not save an array of different CloudObjects.", function(done) {
        this.timeout(10000);

       var obj = new CB.CloudObject('Student');
       obj.set('name','sample');

        var obj1 = new CB.CloudObject('Sample');
        obj1.set('name','sample');

        var obj2 = new CB.CloudObject('Sample');
		obj2.set('name','sample');
		obj2.set('relationArray', [obj1, obj]);

        
     	obj.save({
     		success : function(newObj){

       			obj2.save({success : function(newObj){
       				throw "Saved different types of CloudObject in a single list";
       			}, error : function(error){
       				done();
       			}	
       		});
    	}, error : function(error){
                throw "Cannot save obj";
            }});
    });

 // Test for error of getting duplicate objects while saving a object after updating
    it("Should not duplicate the values in a list after updating",function(done){
        this.timeout(10000);
        var obj = new CB.CloudObject('student1');
        obj.set('age',5);
        obj.set('name','abcd');
        var obj1 = new CB.CloudObject('Custom4');
        obj1.set('newColumn7',[obj,obj]);
        obj1.save().then(function(list){
            nc7=list.get('newColumn7');
            nc7.push(obj);
            obj1.set('newColumn7',nc7);
            obj1.save().then(function(list){
                if(list.get('newColumn7').length === 3)
                    done();
                else
                    throw "should not save duplicate objects";
            },function(){
                throw "should save cloud object ";
            });
        },function(err){
            throw "should save cloud object";
        });
    });

// Test Case for error saving an object in a column
    it("should save a JSON object in a column",function(done){
        this.timeout(10000);
        var json= {"name":"vipul","location":"uoh","age":10};
        var obj = new CB.CloudObject('Custom');
        obj.set('newColumn6',json);
        obj.save().then(function(list){
            var obje=list.get('newColumn6');
            if(obje.name === 'vipul' && obje.location === 'uoh' && obje.age === 10)
                done();
            else
                throw "error in saving json object";
        },function(){
            throw "should save JSON object in cloud";
        });
    });

// Test to automatically delete the a reference of the non existing cloudobject when it is saved.

    it("should automatically delete the reference of deleted object while saving",function(done){
        this.timeout(10000);
        var obj = new CB.CloudObject('Custom4');
        var obj1 = new CB.CloudObject('student1');
        var obj2 = new CB.CloudObject('student1');
        obj1.set('name','vipul');
        obj1.set('age',15);
        obj2.set('name','ranjeet');
        obj2.set('age',24);
        obj.set('newColumn7',[obj1]);
        obj.save().then(function(list){
            obj=list;
            obj1=list.get('newColumn7')[0];
            obj1.delete().then(function(){
                nc7=obj.get('newColumn7');
                nc7.push(obj2);
                obj.set('newColumn7',nc7);
                obj.save().then(function(list){
                    var check = list.get('newColumn7');
                    if(check.length === 1) {
                        if (check[0].get('name') === 'ranjeet')
                            done();
                        else
                            throw "should automatically delete reference of automatically deleted object";
                    }else
                        throw "should automatically delete reference of automatically deleted object";
                },function(err){
                    console.log(err);
                });
            },function(){
            throw "should delete object";
        });
    });
    });
});
