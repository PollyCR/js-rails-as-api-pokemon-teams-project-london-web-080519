class TrainerSerializer
  def initialize(trainer)
    @trainer = trainer
  end
  def to_serialized_json
    @trainer.to_json(:include => {
      :pokemon => {:only => [:nickname, :species]}
    })
  end
end
