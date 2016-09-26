from collections import namedtuple

from django.utils.translation import ugettext_lazy as _

from euth.documents import phases as documents_phases
from euth.ideas import phases as ideas_phases


ProjectBlueprint = namedtuple(
    'ProjectBlueprint', ['title', 'description', 'content', 'image']
)

blueprints = [
    ('ideas-collection-1',
     ProjectBlueprint(
         title=_('Idea collection 1'),
         description=_('Collect ideas'),
         content=[
             ideas_phases.IssuePhase(),
             ideas_phases.FeedbackPhase(),
         ],
         image='images/placeholder.png',
     )),
    ('ideas-collection-2',
     ProjectBlueprint(
         title=_('Idea collection 2'),
         description=_('Collect ideas'),
         content=[
             ideas_phases.CollectPhase(),
             ideas_phases.RatingPhase(),
         ],
         image='images/placeholder.png',
     )),

    ('commenting-text',
     ProjectBlueprint(
         title=_('Commenting text'),
         description=_('Add comments to an existing text'),
         content=[
             documents_phases.CommentPhase(),
         ],
         image='images/placeholder.png',
     )),
]


class BlueprintMixin():
    @property
    def blueprint(self):
        return dict(blueprints)[self.kwargs['blueprint_slug']]